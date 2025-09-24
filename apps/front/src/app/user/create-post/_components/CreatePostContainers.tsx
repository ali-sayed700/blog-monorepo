'use client';

import { useActionState } from 'react';
import UpsertPostForm from './upsertPostForm';
import { saveNewPost } from '@/lib/actions/postsActions';

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined);

  return <UpsertPostForm state={state} formAction={action} />;
};

export default CreatePostContainer;
