import React from 'react';
import { useInView } from 'react-intersection-observer';

export const InfiniteScroll = ({ loadMore, hasMore }:any) => {
 const [ref, inView] = useInView({
   triggerOnce: true,
 });

 React.useEffect(() => {
   if (inView && hasMore) {
     loadMore();
   }
 }, [inView, hasMore, loadMore]);

 return <div ref={ref} />;
};

//export  InfiniteScroll;
