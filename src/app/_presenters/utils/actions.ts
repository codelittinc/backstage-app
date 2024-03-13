export const onDeleteAction = (onDelete: () => void) => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    onDelete();
  }
};
