import { IUserLink } from '@thadaw.com/data';
import Button from './Button';

interface IUserLinksProps {
  userLinks: IUserLink[];
}

export default function UserLinks({ userLinks }: IUserLinksProps) {
  return (
    <div>
      {userLinks.map(link => (
        <Button target="_blank" href={link.url} key={link.label} aria-label={link.label}>
          <i className={link.iconClassName}></i>
        </Button>
      ))}
    </div>
  );
}
