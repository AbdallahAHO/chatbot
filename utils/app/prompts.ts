import PocketBase from 'pocketbase';

import { Prompt } from '@/types/prompt';

export const pocketBaseInstance = new PocketBase('https://pocket.aaho.cc');

export const updatePrompt = (updatedPrompt: Prompt, allPrompts: Prompt[]) => {
  const updatedPrompts = allPrompts.map((c) => {
    if (c.id === updatedPrompt.id) {
      return updatedPrompt;
    }

    return c;
  });

  savePrompts(updatedPrompts);

  return {
    single: updatedPrompt,
    all: updatedPrompts,
  };
};

export const savePrompts = async (prompts: Prompt[]) => {
  // filter out duplicated prompts that have the same name
  const filteredPrompts = prompts.filter(
    (prompt, index, self) =>
      index ===
      self.findIndex((t) => t.id === prompt.id || t.name === prompt.name),
  );

  // example update data
  await pocketBaseInstance
    .collection('promptsInBulk')
    .update('rwc9dksdjxzjcp3', {
      promptsStringify: JSON.stringify(filteredPrompts),
    });
};
