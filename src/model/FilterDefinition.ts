import { object, record, regex, string, unknown, Input } from 'valibot';

export const filterDefinitionSchema = object({
  id: string('The id must be a string'),
  component: string('The component must be a string', [
    regex(/^[A-Z]/, 'The component must start with an uppercase letter'),
  ]),
  componentProps: record(
    unknown(),
    'The componentProps must be an object of type Record<string, unknown>'
  ),
});

export type FilterDefinition = Input<typeof filterDefinitionSchema>;
