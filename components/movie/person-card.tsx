import Image from 'next/image';
import Link from 'next/link';

interface PersonCardProps {
  personId: number;
  name: string;
  pictureUrl: string | null;
  characterName?: string | null;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  personId,
  name,
  pictureUrl,
  characterName,
}) => {
  const showCharacter = typeof characterName === 'string' && characterName.trim().length > 0;

  return (
    <Link
      href={`/person/${personId}`}
      className="group flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200 md:h-24 md:w-24">
        {pictureUrl ? (
          <Image
            src={pictureUrl}
            alt={name}
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-base font-medium text-slate-500">
            {name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-start gap-1">
        <span className="line-clamp-2 text-sm font-medium">{name}</span>
        {showCharacter && (
          <span className="line-clamp-2 text-xs text-slate-500">{characterName}</span>
        )}
      </div>
    </Link>
  );
};
