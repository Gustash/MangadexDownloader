export const extractHeaderTitle = (scene) => {
  const {options} = scene.descriptor;
  return options.headerTitle !== undefined
    ? options.headerTitle
    : options.title !== undefined
    ? options.title
    : scene.route.name;
};
