import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { amplifyConfig as config } from './amplifyConfig';

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});
