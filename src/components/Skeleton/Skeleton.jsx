import {SkeletonList, SkeletonCard} from './Skeleton.styled'

export default function Skeleton() {
    return (
      <SkeletonList>
        {[...new Array(12)].map((el, index) => (
          <SkeletonCard key={index}>
            <div className="image"></div>
          </SkeletonCard>
        ))}
      </SkeletonList>
    );
  }