import Skeleton from 'react-loading-skeleton';

export default function RowSkeleton({ numCards }) {
  return (
    <>
      {Array.from({ length: numCards }).map((_, index) => (
        <div className="card skeleton-container third-width">
          <Skeleton count={2} />
          <Skeleton count={1} height={100} className="" />
        </div>
      ))}
    </>
  )
}
