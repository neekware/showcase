interface BlobProps {
  position?: string;
  size?: string;
  color?: string;
  rounded?: string;
  blurLevel?: string;
}

interface BlobsAnimationProps {
  className?: string;
  blobs?: Partial<BlobProps>[];
}

const defaultBlobs: BlobProps[] = [
  {
    position: '-left-4 top-0',
    size: 'h-72 w-72',
    rounded: 'rounded-full',
    color: 'bg-purple-300',
    blurLevel: 'blur-xl',
  },
  {
    position: '-right-4 top-0',
    size: 'h-72 w-72',
    rounded: 'rounded-full',
    color: 'bg-yellow-300',
    blurLevel: 'blur-xl',
  },
  {
    position: '-bottom-8 left-20',
    size: 'h-72 w-72',
    rounded: 'rounded-full',
    color: 'bg-pink-300',
    blurLevel: 'blur-xl',
  },
];

export const BlobsAnimation: React.FC<BlobsAnimationProps> = ({
  className = '',
  blobs = [],
}) => {
  const finalBlobs = defaultBlobs.map((defaultBlob, index) => ({
    ...defaultBlob,
    ...(blobs[index] || {}),
  }));

  return (
    <div className={`${className}`}>
      <div className="fixed w-full max-w-lg opacity-20">
        {finalBlobs.map((blob, index) => {
          const delay = index === 0 ? '' : `animation-delay-${index * 2000}`;
          return (
            <div
              key={index}
              className={`animate-blob ${delay} absolute ${blob.position} ${blob.size} ${blob.rounded} ${blob.color} opacity-70 mix-blend-multiply ${blob.blurLevel} filter`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

// interface BlobsAnimationProps {
//   className?: string;
// }

// export const BlobsAnimation: React.FC<BlobsAnimationProps> = ({
//   className = '',
// }) => {
//   return (
//     <div className={`${className}`}>
//       <div className="relative w-full max-w-lg opacity-20">
//         <div className="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
//         <div className="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
//         <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
//       </div>
//     </div>
//   );
// };
