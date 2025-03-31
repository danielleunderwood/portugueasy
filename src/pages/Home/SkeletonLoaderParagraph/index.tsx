import SkeletonLoaderTextLine from './SkeletonLoaderTextLine.jsx';

function SkeletonLoaderParagraph() {
  return (
    <view className="flex flex-col gap-2">
      <SkeletonLoaderTextLine />
      <SkeletonLoaderTextLine />
      <SkeletonLoaderTextLine />
    </view>
  );
}

export default SkeletonLoaderParagraph;
