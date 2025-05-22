import { UserButton } from "@clerk/nextjs";
import App from './App';
import Chat from './Chat';

export const metadata = {
  title: 'Bug Wizard',
};

export default function Home() {
  return (
    <main>
      <UserButton />
      <App>
        <Chat />
      </App>
    </main>
  );
}
