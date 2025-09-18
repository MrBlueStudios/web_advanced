<script>
// The context, including the parameters is passed in through $props
// @see https://svelte.dev/tutorial/svelte/declaring-props
let { context } = $props();

const queryParams = new URLSearchParams(context.querystring);
console.log(queryParams.toString());
for (const key of queryParams.keys()) {
    console.log(`${key} = ${queryParams.get(key)}`);
}
</script>

<h1 class="text-3xl font-bold underline">Example page with parameters</h1>
<p>This page demonstrates how parameters can be passed through the <a href="https://visionmedia.github.io/page.js/">Page.js</a> router.</p>

<h2>Path parameters</h2>
<p>If you take a look at the routing in `App.svelte` you will notice the url for this page has <code>/example/:id</code></p>
<p>The <code>:id</code> is a path parameter and works similar to path parameters in Express.</p>
<p>To access it in you component you can read `context.params.[parametername]` The current value is {context.params.id}</p>

<h2>Query parameters</h2>
<p>Query parameters can be added to any url. It has no impact on the routing of that url. So you will not have to include query parameters in your routing.</p>
<p>The context object stores the query parameters in the `querystring` property of the context.</p>
<p>You can pass that string to the constructor of `URLSearchParams` and you will get an object to help you interact with the query parameters</p>
<pre>
const queryParams = new URLSearchParams(context.querystring);
</pre>
<p>The current query parameters will have been logged in the console of your browser.</p>
<p>See <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams">https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams</a> for more information on URLSearchParams.</p>

