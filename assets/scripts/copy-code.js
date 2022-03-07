var codeBlocks = document.querySelectorAll('pre.highlight');

codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = '';

  var icon = document.createElement('i');
  icon.className = "fa fa-clone";
  icon.ariaHidden = true;
  copyButton.appendChild(icon);

  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    icon.className = "fa fa-check";

    setTimeout(function () {
      icon.className = "fa fa-clone";
    }, 3000);
  });

  codeBlock.append(copyButton);
});