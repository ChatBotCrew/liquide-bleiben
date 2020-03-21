<script>
  import { fly } from 'svelte/transition';

  export let selection;

  const tableData = [
    {
      name: 'Akutkredit LfA',
      land: 'NRW',
      summe: 10000,
      mitarbeiter: 500,
      jahresabschluss: 0,
    },
    {
      name: 'L-Bank',
      land: 'Hessen',
      summe: 25000,
      mitarbeiter: 100,
      jahresabschluss: 2,
    },
    {
      name: 'Bayernfonds',
      land: 'Bayern',
      summe: 10000,
      mitarbeiter: 5,
      jahresabschluss: 1,
    },
  ];
</script>

{#each Object.keys(selection) as key}
  <div>
    <span>{key}</span>
    <span>{selection[key]}</span>
  </div>
{/each}
<table>
  <tr class="theader">
    <th>Name</th>
    <th>Land</th>
    <th>Fördersumme</th>
    <th>Mitarbeiter</th>
    <th>Jahresabschluss</th>
    <th></th>
  </tr>
  {#each tableData as row}
    <tr>
      <td>{row.name}</td>
      <td>{row.land}</td>
      <td>{row.summe}</td>
      <td>{row.mitarbeiter}</td>
      <td>{row.jahresabschluss}</td>
      <td><a href="#">Zur Ansicht →</a></td>
    </tr>
  {/each}
</table>

<style>
  table {
    width: 100%;
  }

  tr {
    height: 50px;
  }

  table > tr:first-child {
    background-color: hsl(15, 100%, 90%);
  }
</style>