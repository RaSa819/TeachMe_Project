export function MessageBox(openDialog,title,content,
  rightBtnText) {
  openDialog({
    // set the dialog's title
    title: title,
    // include some text to show the user, NOTE: this could be any arbitrary
    // component, not just a string.
    contentText: content,
    // don't render the cancel button, because in this case the only thing a
    // user can do is "dismiss" the notification.
    cancelButton: false,
    // Mui defaults to text buttons, let's use a contained one styled with
    // the theme's primary color
    submitButton: {
      children: rightBtnText,
      props: {
        variant: "contained",
        color: "primary"
      }
    }
  });
}
