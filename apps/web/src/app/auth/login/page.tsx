import { Button, Input, Label } from '@repo/nx-ui-vendor';

export default function Login() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-primary-500 dark:text-primary-400">
            Create your account to get started.
          </p>
        </div>
        <form className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter a username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Enter your phone number" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter a password" type="password" />
          </div>
          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
