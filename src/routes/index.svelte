<script lang="ts">
    let promise: Promise<object>

    const onClick = () => {
        promise = fetch("/", {
            method: 'POST',
        })
    }
</script>

<button on:click={onClick}>Run</button>

{#await promise}
    Loading...
{:then result}
    <pre>{JSON.stringify(result, null, 2)}</pre>
{:catch error}
    <pre>{error}</pre>
{/await}
