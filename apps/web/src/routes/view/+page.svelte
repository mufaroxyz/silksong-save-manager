<script lang="ts">
  import { useAnalysis } from "./shared.svelte";

  const analysis = useAnalysis();
</script>

<h1>{analysis.saveData.playerData.completionPercentage} %</h1>
