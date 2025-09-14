using System.Reflection;
using System.Text;

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
  if (type.IsArray) return $"{GetTypeScriptType(type.GetElementType()!)}[]";
  if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(List<>))
    return $"{GetTypeScriptType(type.GetGenericArguments()[0])}[]";

  if (type.IsValueType && !type.IsPrimitive && !type.IsEnum)
  {
    var structFields = type.GetFields(BindingFlags.Public | BindingFlags.Instance);
    if (structFields.Length > 0)
    {
      var props = structFields.Select(f => $"{f.Name}: {GetTypeScriptType(f.FieldType)}");
      return $"{{ {string.Join(", ", props)} }}";
    }
  }

  if (type.IsEnum)
  {
    return "number";
  }

  return "any";
}

bool IsDataProperty(PropertyInfo prop)
{
  return prop.CanRead && prop.CanWrite &&
         prop.GetGetMethod()?.IsPublic == true &&
         prop.GetSetMethod()?.IsPublic == true;
}

string GenerateInterface(Type type)
{
  var sb = new StringBuilder();
  var fields = type.GetFields(BindingFlags.Public | BindingFlags.Instance);
  var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                      .Where(IsDataProperty); // Filter out computed properties

  sb.AppendLine($"export interface {type.Name} {{");

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

var argDict = ParseArgs(args);

if (!argDict.TryGetValue("gameDllPath", out string assemblyPath) || string.IsNullOrWhiteSpace(assemblyPath))
{
  Console.WriteLine("Please provide the path to the Game's DLL.");
  Console.WriteLine("dotnet run -- --gameDllPath <path_to_game_dll> --outputDir <output_directory> --types <type1,type2,...>");
  return;
}

string outputDir = argDict.TryGetValue("outputDir", out string outDir) ? outDir : Directory.GetCurrentDirectory();
string[] typeNames = argDict.TryGetValue("types", out string types) ? types.Split(',') : new[] { "PlayerData" };

if (!File.Exists(assemblyPath))
{
  Console.WriteLine($"The path '{assemblyPath}' does not exist.");
  return;
}

try
{
  Assembly assembly = Assembly.LoadFrom(assemblyPath);
  var sb = new StringBuilder();

  foreach (string typeName in typeNames)
  {
    Type? type = assembly.GetType(typeName.Trim());
    if (type == null)
    {
      Console.WriteLine($"Type '{typeName}' not found in the assembly.");
      continue;
    }

    Console.WriteLine($"Generating interface for {typeName}...");
    sb.AppendLine(GenerateInterface(type));
    sb.AppendLine();
  }

  Directory.CreateDirectory(outputDir);
  File.WriteAllText(Path.Combine(outputDir, "game-types.d.ts"), sb.ToString());
  Console.WriteLine($"TypeScript definitions generated at: {Path.GetFullPath(Path.Combine(outputDir, "game-types.d.ts"))}");
}
catch (Exception ex)
{
  Console.WriteLine($"An error occurred: {ex.Message}");
  Console.WriteLine($"Stack trace: {ex.StackTrace}");
}