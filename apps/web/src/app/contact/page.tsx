import { Icon, mdiEmailFastOutline } from '@lib/ui-icon-next';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Textarea,
} from '@lib/ui-vendor-next';

export default function Contact() {
  return (
    <Card className="mx-auto w-full sm:w-[500px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Contact us by filling out the form below.</CardDescription>
          </div>
          <div>
            <Icon path={mdiEmailFastOutline} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="py-4">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Name</Label>
            <Input id="full-name" placeholder="Enter your full name" />
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
            <Label htmlFor="message">Message</Label>
            <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
          </div>
          <Button className="" type="submit">
            Send Message
          </Button>
        </form>
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        A human will get back to you shortly if needed.
      </CardFooter>
    </Card>
  );
}
