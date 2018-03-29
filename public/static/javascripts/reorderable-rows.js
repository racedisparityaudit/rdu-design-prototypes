
var ReorderableRows = function(element) {

  var element = element;

  var elementBeingDragged = null;
  this.onDrop = null;
  var elementBeingDragged;
  setup();

  function setup() {

    element.classList.add('reorderable')

    var rows = element.querySelectorAll('tbody tr')

    for (var i = 0; i < rows.length; i++) {
      rows[i].draggable = true
    }

  }

  var dragStarted = function(event) {

    event.dataTransfer.effectAllowed = 'move';
    elementBeingDragged = event.target;

    while (elementBeingDragged.tagName != 'TR') {
      elementBeingDragged = elementBeingDragged.parentElement
    }

    elementBeingDragged.classList.add('being-dragged')

    event.dataTransfer.setData('text/html',elementBeingDragged.innerHTML)

  }

  var dropped = function(event) {
    dimensionTarget = event.target;

    while (dimensionTarget.tagName != 'TR') {
      dimensionTarget = dimensionTarget.parentElement
    }

    if (dimensionTarget.classList.contains('drop-destination-above')) {
      dimensionTarget.parentElement.insertBefore(elementBeingDragged, dimensionTarget);
    } else {
      dimensionTarget.parentElement.insertBefore(elementBeingDragged, dimensionTarget.nextSibling);
    }


    for (el of document.querySelectorAll('.drop-destination-above')) {
      el.classList.remove('drop-destination-above');
    }

    for (el of document.querySelectorAll('.drop-destination-below')) {
      el.classList.remove('drop-destination-below');
    }

    for (el of document.querySelectorAll('.being-dragged')) {
      el.classList.remove('being-dragged');
    }

    if (this.onDrop) {
      this.onDrop();
    }
  }


  var draggedOver = function(event) {

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'

    var dimensionTarget = event.target

    while (dimensionTarget.tagName != 'TR') {
      dimensionTarget = dimensionTarget.parentElement
    }

    for (el of document.querySelectorAll('.drop-destination-above')) {
      el.classList.remove('drop-destination-above');
    }

    for (el of document.querySelectorAll('.drop-destination-below')) {
      el.classList.remove('drop-destination-below');
    }


    if (dimensionTarget != elementBeingDragged) {

      if (event.offsetY < (dimensionTarget.clientHeight / 2)) {
        dimensionTarget.classList.add('drop-destination-above')
      } else {
        dimensionTarget.classList.add('drop-destination-below')
      }
    }

  }

  element.addEventListener('dragstart', dragStarted.bind(this));
  element.addEventListener('drop', dropped.bind(this));
  element.addEventListener('dragover', draggedOver.bind(this));

}
