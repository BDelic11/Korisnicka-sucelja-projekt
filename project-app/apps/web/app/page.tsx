import { db, users } from '@repo/db';
import { revalidatePath } from 'next/cache';

async function getData() {
  const usersData = await db.select().from(users);
  return usersData;
}

export default async function Home() {
  const onSubmit = async (formData: FormData) => {
    'use server';
    const name = formData.get('name')?.toString();
    await db.insert(users).values({ name: name || 'ivo' });

    revalidatePath('/');
  };

  const data = await getData();

  return (
    <div>
      <h1>Web</h1>
      <form action={onSubmit}>
        <input type='text' name='name' />
        <button type='submit'>Dodaj</button>
      </form>
      <div>
        <div>Users:</div>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.id} - {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
