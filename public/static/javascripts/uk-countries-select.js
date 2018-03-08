

function ukCountriesSelect(element) {

  var element = element;

  var countryInputs, ukInput;
  setup();

  function setup() {


    if (!(
      element &&
      'querySelector' in element &&
      'querySelectorAll' in element
    )) { return; }

    ukInput = document.createElement('input')
    ukInput.setAttribute('type', 'checkbox')
    ukInput.setAttribute('id', 'uk')

    var ukInputLabel = document.createElement('label')
    ukInputLabel.setAttribute('for', 'uk')
    ukInputLabel.textContent = 'All (United Kingdom)'

    var ukInputContainer = document.createElement('div')
    ukInputContainer.setAttribute('class', 'multiple-choice uk')

    ukInputContainer.appendChild(ukInput)
    ukInputContainer.appendChild(ukInputLabel)

    var legend = element.querySelector('legend')

    if (!legend) {
      console.warn('missing legend for UK fieldset');
      return;
    }

    legend.parentElement.insertBefore(ukInputContainer, legend.nextSibling)

    if (ukInput) {
      ukInput.addEventListener('change', ukChanged)

      countryInputs = element.querySelectorAll('input.country')

      for (var i = countryInputs.length - 1; i >= 0; i--) {
        countryInputs[i].addEventListener('change', countryChanged)
      }

      countryChanged();

    }

  }

  function countryChanged(event) {

    var checkedCountries = 0;

    for (var i = countryInputs.length - 1; i >= 0; i--) {

      if (countryInputs[i].checked) {
        checkedCountries += 1;
      }

    }

    ukInput.checked = (checkedCountries == countryInputs.length);

  }

  function ukChanged() {

    for (var i = countryInputs.length - 1; i >= 0; i--) {
      countryInputs[i].checked = ukInput.checked;
    }

  }

}