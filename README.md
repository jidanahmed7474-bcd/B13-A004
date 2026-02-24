Question 1: What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: a) getElementById: Selects a single element by its unique id. It returns only one element.
        b) getElementByClassname: Selects multipule elements that share the same class name. It returns a live htmlcollection.
        c) querySelector: Returns all matching elements based on a css selector. It returns a static Nodelist.

Question 2: How do you create and insert a new element into the DOM?
Answer: a) Create the element using document.createrElement()
        b) Add content (text or html)
        c) Insert it into the dom using methods like appenChild() 
        
Question 3: What is Event Bubbling? And how does it work?
Amswer: a) About Event Bubbing: Event Bubbling is a concept in the DOM where an event starts from the target element and then propagates (bubbles up) to its parent elements, all the way up to the document.
        b) How it work: When you click on a child element, the event first runs on that element, then moves upward step by step through its ancestors.

Question 4: What is Event Delegation in JavaScript? Why is it useful?
Answer: a) Event Delegation: Event Delegation is a technique where you attach a single event listener to a parent element instead of adding event listeners to multiple child elements. It works because of event bubbling.
        b) Useful:
                 1) Improves performance (fewer event listeners)
                 2) Works for dynamically added elements
                 3) Cleaner and more maintainable code

Question 5: What is the difference between preventDefault() and stopPropagation() methods?
Answer: Difference between preventDefault() and stopPropagation() methods:
        a) preventDefault(): controls browser behavior
        b) stopPropagation(): controls event flow
