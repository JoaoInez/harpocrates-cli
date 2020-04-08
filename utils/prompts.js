const prompts = require("prompts");

const onSubmit = (_, __, answers) => (answers.__cancelled__ = false);

const onCancel = (_, answers) => {
  answers.__cancelled__ = true;
  return false;
};

module.exports = (questions) => prompts(questions, { onSubmit, onCancel });
