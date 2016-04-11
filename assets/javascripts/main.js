var Redcaser = {};

// TODO: Create a simple wrapper to keep all the functionality related to
//       Redcase's dialog windows at the only place, and provide more
//       OOP-like access to show/hide it.
$(function () {
  $('#redcase-dialog').keydown(function (event) {
    if (event.keyCode === 13) {
      $(this)
        .parents()
        .find('.ui-dialog-buttonpane button')
        .first()
        .trigger('click');
      return false;
    }
  });

  Redcaser = $.extend(
    Redcaser, {
      jsCopyToMenuItems: [],
      errorBox: function (errorMessage) {
        $('#redcase-error-message').text(errorMessage);
        $('#redcase-error').dialog({
          modal: true,
          buttons: {
            OK: function () {
              $(this).dialog('close');
            }
          }
        })
      },
      full: function () {
        Redcaser.executionSuiteTree.updateList2();
        Redcaser.combos.update();
      }
    }
  );
});
