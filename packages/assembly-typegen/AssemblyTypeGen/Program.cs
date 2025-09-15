using System.Reflection;
using System.Text;

// recursion went brr with this one
var discoveredTypes = new HashSet<Type>();
var generatedInterfaces = new Dictionary<Type, string>();

Dictionary<string, string> ParseArgs(string[] args)
{
  var dict = new Dictionary<string, string>();
  for (int i = 0; i < args.Length - 1; i++)
  {
    if (args[i].StartsWith("--"))
      dict[args[i].TrimStart('-')] = args[i + 1];
  }
  return dict;
}

string GetTypeScriptType(Type type)
{
  if (type == typeof(bool)) return "boolean";
  if (type == typeof(int) || type == typeof(float) || type == typeof(double) || type == typeof(decimal)) return "number";
  if (type == typeof(string)) return "string";
  if (type.IsArray)
  {
    DiscoverType(type.GetElementType()!);
    return $"{GetTypeScriptType(type.GetElementType()!)}[]";
  }
  if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(List<>))
  {
    var genericArg = type.GetGenericArguments()[0];
    DiscoverType(genericArg);
    return $"{GetTypeScriptType(genericArg)}[]";
  }
  if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Dictionary<,>))
  {
    var keyType = type.GetGenericArguments()[0];
    var valueType = type.GetGenericArguments()[1];
    DiscoverType(keyType);
    DiscoverType(valueType);
    return $"Record<{GetTypeScriptType(keyType)}, {GetTypeScriptType(valueType)}>";
  }

  if (type.IsGenericType)
  {
    var genericTypeDef = type.GetGenericTypeDefinition();
    var genericArgs = type.GetGenericArguments();

    if (genericTypeDef.Name.StartsWith("HashSet`"))
    {
      var elementType = genericArgs[0];
      DiscoverType(elementType);
      return $"Set<{GetTypeScriptType(elementType)}>";
    }

    var baseTypeName = genericTypeDef.Name.Split('`')[0];
    var typeArguments = string.Join(", ", genericArgs.Select(GetTypeScriptType));
    foreach (var arg in genericArgs)
    {
      DiscoverType(arg);
    }
    return $"{baseTypeName}<{typeArguments}>";
  }

  if (type.IsValueType && !type.IsPrimitive && !type.IsEnum) // A struct
  {
    DiscoverType(type);
    return GetTypeScriptTypeName(type);
  }

  if (type.IsEnum)
  {
    return "number";
  }

  if (type.IsClass && type != typeof(string) && type != typeof(object))
  {
    DiscoverType(type);
    return GetTypeScriptTypeName(type);
  }

  return "any";
}

string GetTypeScriptTypeName(Type type)
{
  return type.IsNested ?
    type.FullName!.Replace(type.Namespace + ".", "").Replace("+", "") :
    type.Name;
}

void DiscoverType(Type type)
{
  if (type.IsPrimitive ||
      type == typeof(string) ||
      type == typeof(object) ||
      type == typeof(decimal) ||
      discoveredTypes.Contains(type))
  {
    return;
  }

  if (type.IsGenericTypeDefinition)
  {
    return;
  }

  if (type.IsArray)
  {
    DiscoverType(type.GetElementType()!);
    return;
  }

  if (type.IsGenericType)
  {
    foreach (var genericArg in type.GetGenericArguments())
    {
      DiscoverType(genericArg);
    }
    return;
  }

  discoveredTypes.Add(type);

  var allFields = GetAllFields(type);
  var fields = allFields.Where(f => IsSerializableField(f) && !ShouldExcludeField(f));
  var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                      .Where(IsDataProperty);

  foreach (var field in fields)
  {
    DiscoverType(field.FieldType);
  }

  foreach (var prop in properties)
  {
    DiscoverType(prop.PropertyType);
  }

  var nestedTypes = type.GetNestedTypes(BindingFlags.Public);
  foreach (var nestedType in nestedTypes)
  {
    DiscoverType(nestedType);
  }
}

bool IsDataProperty(PropertyInfo prop)
{
  return prop.CanRead && prop.CanWrite &&
         prop.GetGetMethod()?.IsPublic == true &&
         prop.GetSetMethod()?.IsPublic == true;
}

bool IsSerializableField(FieldInfo field)
{
  if (field.IsPublic)
    return true;

  if (field.IsPrivate)
  {
    var attributes = field.GetCustomAttributes(false);
    foreach (var attr in attributes)
    {
      var attrType = attr.GetType();
      if (attrType.Name == "SerializeField" ||
          attrType.Name == "JsonPropertyAttribute" ||
          attrType.Name == "JsonProperty")
      {
        return true;
      }
    }
  }

  return false;
}

bool ShouldExcludeField(FieldInfo field)
{
  var attributes = field.GetCustomAttributes(false);
  foreach (var attr in attributes)
  {
    var attrType = attr.GetType();
    if (attrType.Name == "NonSerializedAttribute" ||
        attrType.Name == "NonSerialized")
    {
      return true;
    }
  }
  return false;
}

string GenerateInterface(Type type)
{
  var sb = new StringBuilder();

  var allFields = GetAllFields(type);
  var fields = allFields.Where(f => IsSerializableField(f) && !ShouldExcludeField(f));

  var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                      .Where(IsDataProperty); // Filter out computed properties

  string interfaceName = GetTypeScriptTypeName(type);

  sb.AppendLine($"export interface {interfaceName} {{");

  foreach (var field in fields.OrderBy(f => f.Name))
  {
    string tsType = GetTypeScriptType(field.FieldType);
    sb.AppendLine($"    {field.Name}: {tsType};");
  }

  var fieldNames = new HashSet<string>(fields.Select(f => f.Name));
  foreach (var prop in properties.Where(p => !fieldNames.Contains(p.Name)).OrderBy(p => p.Name))
  {
    string tsType = GetTypeScriptType(prop.PropertyType);
    sb.AppendLine($"    {prop.Name}: {tsType};");
  }

  sb.AppendLine("}");
  return sb.ToString();
}

IEnumerable<FieldInfo> GetAllFields(Type type)
{
  var fields = new List<FieldInfo>();

  var currentType = type;
  while (currentType != null && currentType != typeof(object))
  {
    fields.AddRange(currentType.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
    currentType = currentType.BaseType;
  }

  return fields;
}

var argDict = ParseArgs(args);

if (!argDict.TryGetValue("gameDllPath", out string? assemblyPath) || string.IsNullOrWhiteSpace(assemblyPath))
{
  Console.WriteLine("Please provide the path to the Game's DLL.");
  Console.WriteLine("dotnet run -- --gameDllPath <path_to_game_dll> --outputDir <output_directory> --types <type1,type2,...>");
  return;
}

string outputDir = argDict.TryGetValue("outputDir", out string? outDir) ? outDir : Directory.GetCurrentDirectory();
string[] typeNames = argDict.TryGetValue("types", out string? types) ? types.Split(',') : new[] { "PlayerData" };

if (!File.Exists(assemblyPath))
{
  Console.WriteLine($"The path '{assemblyPath}' does not exist.");
  return;
}

try
{
  Assembly assembly = Assembly.LoadFrom(assemblyPath);
  var sb = new StringBuilder();

  // discover from root types via --types 
  foreach (string typeName in typeNames)
  {
    Type? type = assembly.GetType(typeName.Trim());
    if (type == null)
    {
      Console.WriteLine($"Type '{typeName}' not found in the assembly.");
      continue;
    }

    Console.WriteLine($"Discovering types starting from {typeName}...");
    DiscoverType(type);
  }

  // now we generate after all discovery is done
  var sortedTypes = discoveredTypes.OrderBy(t => t.FullName).ToList();

  foreach (var type in sortedTypes)
  {
    Console.WriteLine($"Generating interface for {type.Name}...");
    sb.AppendLine(GenerateInterface(type));
    sb.AppendLine();
  }

  Directory.CreateDirectory(outputDir);
  File.WriteAllText(Path.Combine(outputDir, "game-types.d.ts"), sb.ToString());
  Console.WriteLine($"TypeScript definitions generated at: {Path.GetFullPath(Path.Combine(outputDir, "game-types.d.ts"))}");
  Console.WriteLine($"Generated {discoveredTypes.Count} interface(s) total.");
}
catch (Exception ex)
{
  Console.WriteLine($"An error occurred: {ex.Message}");
  Console.WriteLine($"Stack trace: {ex.StackTrace}");
}