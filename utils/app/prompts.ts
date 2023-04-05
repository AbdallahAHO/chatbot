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
  const dedupePrompts = prompts.filter(
    (prompt) => !prompts.find((p) => p.name === prompt.name),
  );

  const stringifiedPrompts = JSON.stringify(dedupePrompts);

  // example update data
  await pocketBaseInstance
    .collection('promptsInBulk')
    .update('rwc9dksdjxzjcp3', {
      promptsStringify: stringifiedPrompts,
    });

  localStorage.setItem('prompts', stringifiedPrompts);
};
