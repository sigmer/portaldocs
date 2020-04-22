<a name="weave"></a>
# Weave

Weave is the next generation of portal rendering engine to replace Knockout (KO). This article walks you through the most important API of Weave (Native Components) and sample code of KO equivalence.

**Note** Weave is currently only available to portal internally. Target audience of this article is portal devs.

* [Native components](#native-components)

* [Migration mapping and sample code](#migration-mapping-and-sample-code)

* [Migration caveats](#migration-caveats)

<a name="weave-native-components"></a>
## Native components

* [Fragment](#fragment-component)
* [If](#if-component)
* [IfNot](#ifnot-component)
* [ForEach](#foreach-component)
* [Lazy](#lazy-component)
* [HtmlFragment](#htmlfragment-component)
* [KoFragment](#kofragment-component)
* [SetContext & GetContext](#setcontext-&-getcontext-component)
* [LifetimeManagerScoped](#lifetimemanagerscoped-component)

<a name="weave-native-components-fragment"></a>
### Fragment

`Fragment` component contains a list of children. You need `Fragment` to assign multiple nodes to a variable or return from a function.
```tsx
function returnsTwoNodes(){
    return (
        <Fragment>
            <div>Some content</div>
            <div>Some other content</div>
        </Fragment>
    );
}
```

<a name="weave-native-components-if"></a>
### If

`If` component binds DOM nodes to a computation, create/remove DOM nodes when computation value is truthy/falsy.
```tsx
<div>
    <If condition={comp} fn={()=>
        <div>Content to be rendered or removed depends on value of "comp"</div>
    } />
</div>
```
`If` component takes 3 parameters:

* **fn: Function** Returns inner content, will be **invoked only once**.
* **condition: Computation**  Controls content creation or removal.
* **concealmentBehavior?: "hide" | "remove"** Defines behavior when `condition` is falsy, default is `remove`.

**Note** `concealmentBehavior="hide"` has better performance when flipping `condition`, because it doesn't remove DOM nodes (it hides them) when `condition` turns falsy, so when `condition` back to truthy, no DOM creation is involved.

<a name="weave-native-components-ifnot"></a>
### IfNot

Similar to `If`, opposite behavior.

<a name="weave-native-components-foreach"></a>
### ForEach

`ForEach` component renders a computation array.

```tsx
const comp = makeWritableComputation([{ value: "a" }, { value: "b" }, { value: "c" }]);
<div>
    <ForEach collection={comp} fn={data =>
        <span>{data.value}</span>;
    } />
</div>
```

Code above is rendered as

```html
<div>
    <span>a</span>
    <span>b</span>
    <span>c</span>
</div>
```

`ForEach` component takes 2 parameters:

* **fn: Function** Maps item to content, `fn` takes 3 parameters.
    * **item: T** The item in `collection`
    * **index: Computation\<number>** The computation of `item` index.
    * **length: Computation\<number>** The computation of `collection` length.
* **collection: Computation\<T[]>** Contains the item list to render.

`ForEach` component tries to do as less DOM manipulation as possible, it compares data array when `collection` changes, for:
* Existing item: reorders DOM nodes to new position of data item.
* New item: creates new DOM nodes.
* Removed item: removes DOM nodes.

<a name="weave-native-components-lazy-component"></a>
### Lazy component

`Lazy` component delays content render or removal until computation turns truthy.

```tsx
<div>
    <Lazy condition={comp} fn={()=>
        <div>Content to be rendered when "comp" first time turns truthy.</div>
    } />
</div>
```

`Lazy` component takes 3 parameters.

* **fn: Function** Returns inner content, will be **invoked only once**.
* **condition: Computation**  Signals content creation or removal.
* **behavior?: "render" | "remove"** Defines behavior when `condition` is truthy, default is `render`.

**Note** Behavior-wise `If` can replace `Lazy` by making `condition` terminates at a truthy value. But `Lazy` releases `condition` to prevent memory leak, while `If` keeps listening.

<a name="weave-native-components-htmlfragment-component"></a>
### HtmlFragment component

`HtmlFragment` component renders Html.

```tsx
const computationOfHtml = makeWritableComputation("<div>Html content</div");
<div>
    <HtmlFragment content={computationOfHtml} skipSanitization={false} />
</div>
```

`HtmlFragment` takes 2 parameters.

* **content: Computation\<string>** Defines the Html content to render.
* **skipSanitization?: boolean** Skips sanitization of Html string, default is `false`

<a name="weave-native-components-kofragment-component"></a>
### KoFragment component

`KoFragment` component renders Knockout html, binds view model.

```tsx
<div>
    <KoFragment content={{
        htmlTemplate: "<div data-bind='text: textOb'></div>",
        viewModel: {
            textOb: ko.observable<string>("content"),
        }
    }} skipSanitization={false} />
</div>
```

`KoFragment` takes 2 parameters.

* **content: Computation\<HtmlContent>** Defines the Knockout content to render.
* **skipSanitization?: boolean** Skips sanitization of Html template, default is `false`

**Note** You should not use `KoFragment` if possible, as it's slower than Weave render and not type safe.

<a name="weave-native-components-htmlorkofragment-component"></a>
### HtmlOrKoFragment component

`HtmlOrKoFragment` component switches between `HtmlFragment` and `KoFragment` based on input type.

```tsx
<div>
    <HtmlOrKoFragment content={content} />
</div>
```

`HtmlOrKoFragment` takes 1 parameter

* **content: ValueOrComputation\<string | HtmlContent>** Defines the content to render. It renders:
    * `HtmlFragment` if `content` is `string`
    * `KoFragment` if `content` is `HtmlContent`

<a name="weave-native-components-setcontext-getcontext-component"></a>
### SetContext &amp; GetContext component

`SetContext` component extends the current context for children nodes.

`GetContext` component gives you the current context.

```tsx
<div>
    <SetContext disabled={newDisabled}>
        <GetContext fn={context =>
            <div aria-disabled={context.disabled}>The "context.disabled" used here is newDisabled object</div>
        } />
    </SetContext>
</div>
```

`SetContext` takes context properties as parameters, including:

* `disabled`
* `tabIndex`
* `diContainer`

`GetContext` takes one `fn` parameter, invokes it with current context.

**Note** In the example above you don't really need `SetContext` and `GetContext`, they're powerful in building children nodes outside of parent. In some controls like Section, children nodes are input, constructed before Section control itself.

```tsx
const child = (
    <GetContext fn={context =>
        <div aria-disabled={context.disabled}>Child node that needs input from parent</div>
    } />
);
const parent = (
    <div>
        <SetContext disabled={newDisabled}>
            {child}
        </SetContext>
    </div>
);
```


<a name="weave-native-components-lifetimemanagerscoped-component"></a>
### LifetimeManagerScoped component

`LifetimeManagerScoped` component gives you the `MsPortalFx.Base.LifetimeManager` instance associated to the current node.

```tsx
<div>
    <LifetimeManagerScoped fn={ltm =>
        <div>Some content needs ltm to build or some resource you want to release when this node is removed.</div>
    } />
</div>
```

`LifetimeManagerScoped` takes one `fn` parameter, invokes it with `ltm` instance.

 The `ltm` will be disposed when node is removed (e.g. inside an `If` component).

<a name="weave-native-components-computation-of-weave-node"></a>
### Computation of Weave node

You can inline a computation of Weave node, the computation's content will be rendered as it changes.

```tsx
const comp = makeWritableComputation(1);
<div>
    {comp.compose(num => <span>It renders the number value of "comp": {num.toString()}</span>)}
</div>
```

**Note** Change of computation causes DOM to re-render, you should minimize the impacted DOM to reduce performance penalty.

<a name="weave-migration-mapping-and-sample-code"></a>
## Migration mapping and sample code

* [Attribute](#attribute)
* [Text](#text)
* [Untrusted Html](#untrusted-html)
* [Trusted Html](#trusted-html)
* [Visible](#visible)
* [Image](#image)
* [Events](#events)
* [fxs-progress](#fxs-progress)
* [Ko-If](#ko-if)
* [Ko-ForEach](#ko-foreach)
* [Ko-Template](#ko-template)
* [PcControl](#pccontrol)


<a name="weave-migration-mapping-and-sample-code-attribute"></a>
### Attribute

Knockout

```html
<div data-bind="attr: { title: titleOb }"></div>
```

Weave

```tsx
<div title={titleComp}></div>
```

<a name="weave-migration-mapping-and-sample-code-text"></a>
### Text

Knockout

```html
<div data-bind="text: textOb"></div>
```

Weave

```tsx
<div>{textComp}</div>
```

<a name="weave-migration-mapping-and-sample-code-untrusted-html"></a>
### Untrusted Html

Knockout

```html
<div data-bind="sanitizedHtml: htmlOb"></div>
```

Weave

```tsx
<div><HtmlFragment content={htmlComp} /></div>
```

<a name="weave-migration-mapping-and-sample-code-trusted-html"></a>
### Trusted Html

Knockout

```html
<div data-bind="unsanitizedHtml: htmlOb"></div>
```

Weave

```tsx
<div><HtmlFragment content={htmlComp} skipSanitization={true} /></div>
```

<a name="weave-migration-mapping-and-sample-code-visible"></a>
### Visible

Knockout

```html
<div data-bind="visible: visibleOb"></div>
```

Weave

```tsx
<div dynamicClass={{ "fxs-display-none": inVisibleComp }}></div>
```

<a name="weave-migration-mapping-and-sample-code-image"></a>
### Image

Knockout

```html
<div data-bind="image: imageOb"></div>
```

Weave

```tsx
<div image={imageComp}></div>
```

<a name="weave-migration-mapping-and-sample-code-events"></a>
### Events

Knockout

```html
<div data-bind="click: clickOb"></div>
```

Weave

```tsx
<div onClick={(evt) => {}}></div>
```

<a name="weave-migration-mapping-and-sample-code-fxs-progress"></a>
### fxs-progress

Knockout

```html
<fxs-progress></fxs-progress>
```

Weave

```tsx
<FxsProgress />
```

<a name="weave-migration-mapping-and-sample-code-ko-if"></a>
### Ko-If

Knockout

```html
<!-- ko if: conditionOb -->
    <div>Some content</div>
<!-- /ko -->
```

Weave **For dynamic boolean**

```tsx
<If condition={conditionComp} fn={() =>
    <div>Some content</div>
} />
```

Weave **For static boolean**

```tsx
condition
    ? <div>Some content</div>
    : null
```

<a name="weave-migration-mapping-and-sample-code-ko-foreach"></a>
### Ko-ForEach

Knockout

```html
<!-- ko foreach: collectionOb -->
    <div data-bind="text: $data"></div>
<!-- /ko -->
```

Weave **For dynamic array**

```tsx
<ForEach collection={collectionComp} fn={item =>
    <div>{item}</div>
} />
```

Weave **For static array**

```tsx
collection.map(item =>
    <div>{item}</div>
)
```

<a name="weave-migration-mapping-and-sample-code-ko-template"></a>
### Ko-Template

Create a component function for template and inline it.

<a name="weave-migration-mapping-and-sample-code-pccontrol"></a>
### PcControl

Knockout

```html
<div data-bind="pcControl: vm"></div>
```

Weave

Option 1, use `KoFragment`.

```tsx
<KoFragment skipSanitization={true}
    content={{
        htmlTemplate: `<div data-bind="pcControl: vm"></div>`,
        viewModel: { vm: vm },
    }} />
```

Option 2, create component wrapper for **migrated controls**.

```tsx
// Sample code from MsPortalImpl.Controls/Fields/TextField.ts
import { createControlComponent } from "MsPortalImpl/Weave/Util";

export const TextField = createControlComponent({
    widgetCtor: Widget /* The TextField Widget constructor */,
    widgetUIStateCtor: WidgetUIState /* The TextField WidgetUIState constructor */,
    innerComponent: TextFieldInner /* The component function for inner content of TextField */,
});

// Use this to replace KoFragment in Option 1
<TextField vm={vm} />
```

Option 3, create component wrapper for **unmigrated controls**.

```tsx
// Sample code from MsPortalImpl.Controls/Controls/Lists/Grid1/Grid1.ts
import { createControlComponentForKO } from "MsPortalImpl/Weave/Util";

export const Grid1 = createControlComponentForKO({ widgetCtor: Widget /* The Grid1 Widget constructor*/ });

// Use this to replace KoFragment in Option 1
<Grid1 vm={vm} />
```

<a name="weave-migration-caveats"></a>
## Migration caveats

* [ko.dataFor](#ko.dataFor)
* [Async render](#async-render)

<a name="weave-migration-caveats-ko-datafor"></a>
### ko.dataFor

`ko.dataFor` is unavailable in Weave because there is no Knockout context, in our code the typical use case of `ko.dataFor` is to get the `ko-forEach` item inside an event handler. You have 2 options:

* `ForEach` component, the `fn` captures item, event handler inside (`onClick`) can access it directly.
* `data` attribute bind: `<div data={item}></div>`, it associates arbitrary data to DOM element, use `getElementData` to retrieve value.

`ko.contextFor` is similar.

<a name="weave-migration-caveats-async-render"></a>
### Async render

Knockout propagates observable change synchronously. As a result of that, the following Knockout code works.
```html
<div data-bind="attr: { tabindex: tabindexOb }"></div>
```

```ts
// tabindexOb's initial value is -1
tabindexOb(0);
div.focus();
```

However Weave propagates computation change asynchronously to minimize redundant computation, ts code above doesn't work if DOM is rendered by Weave. You need to wait for propagation using `waitForChangePropagation`.
```ts
import { waitForChangePropagation } from "FxInternal/Weave/Computation";
// tabindexComp's initial value is -1
tabindexComp(0);
waitForChangePropagation()
.then(() => {
    div.focus();
});
```
