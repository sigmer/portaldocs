# Slider

 
<a name="basics"></a>
### Basics
A Slider is an element used to set a value. It provides a visual indication of the current setting amidst the total range of content. A knob or lever is dragged to one end or the other to make the choice, indicating the current value. Marks on the Slider bar can show values and users can choose where they want to drag the knob or lever to set the value.


<!-- TODO get an IMAGE to embed here -->

<!-- TODO get an SAMPLE CODE to embed here -->

 
<a name="when-to-use"></a>
### When to use
A Slider is a good choice when you know that users think of the value as a relative quantity, not a numeric value. For example, users think about setting their audio volume to low or medium—not about setting the value to two or five.


 
<a name="best-practices"></a>
### Best practices

<a name="best-practices-do"></a>
#### Do

* Consider a Slider when changing a value.
* Use a slider when you want your users to be able to set defined values (such as volume or brightness).
* Include a label indicating what value the Slider changes.
* Use step points (or tick marks) if you don’t want the Slider to allow arbitrary values between min and max.
* Use a Slider when the user would benefit from instant feedback on the effect of setting changes.
* Set the **infoBalloonContent** to concise, helpful text with a link to learn
* Use the **label** option to provide a helpful name for the control.

<a name="best-practices-don-t"></a>
#### Don&#39;t

* Don't use a Slider when the options are not values.
* Don’t use a Slider for binary settings.
* Don’t create a continuous Slider if the range of values is large.
* Don’t use for a range of three values or less.


 
<a name="developer-tips-and-tricks"></a>
### Developer tips and tricks

* To display HTML in the infoBalloonContent use this code

infoBalloonContent: {
    htmlTemplate:"<b>Sample label</b><br>infoBalloonContent should explain concepts and <br>can include a link to learn more.<a>Learn 
    more about infoBalloon</a>",
    viewModel: {},
}



<a name="developer-tips-and-tricks-interactive-control-and-sample-source-code"></a>
#### Interactive control and sample source code
Go to the playground site to use the latest control and get source code for your project.  [Learn more about playground](./top-extensions-controls-playground.md).

The Slider control offers different create methods and has the following entries in the interactive controls playground

*  <a href="https://ms.portal.azure.com/?Microsoft_Azure_Playground=true#blade/Microsoft_Azure_Playground/ControlsIndexBlade/Slider_createSimpleSlider_Playground" target="_blank">Slider (SimpleSlider)</a>

*  <a href="https://ms.portal.azure.com/?Microsoft_Azure_Playground=true#blade/Microsoft_Azure_Playground/ControlsIndexBlade/Slider_createCustomSlider_Playground" target="_blank">Slider (CustomSlider)</a>

 


 
<a name="related-info"></a>
### Related info

* <a href="https://www.figma.com/file/Bwn8rmUOYtnPRwA3JoQTBn/Azure-Portal-Toolkit?node-id=3492%3A393895" target="_blank">Slider in Azure Portal Toolkit (Figma)</a> 

* [Azure design guidance](http://aka.ms/portalfx/design)


