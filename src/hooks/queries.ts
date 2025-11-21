import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, addItem } from '../api/userApi';
export const useItems = () => useInfiniteQuery(['items'], ({ pageParam = 1 }) => fetchItems({ page: pageParam, limit: 20 }), { getNextPageParam: (last) => last.nextPage });
export const useAddItem = () => {
  const qc = useQueryClient();
  return useMutation((title:string)=>addItem(title), {
    onMutate: async (title) => {
      await qc.cancelQueries(['items']);
      const previous = qc.getQueryData(['items']);
      qc.setQueryData(['items'], (old:any)=>{
        const optimistic = { id: Date.now(), title };
        if (!old) return { pages: [{ data: [optimistic], nextPage: 2 }], pageParams: [undefined] };
        const newPages = old.pages.map((p:any,idx:number)=> idx===0 ? { ...p, data: [optimistic, ...p.data] } : p);
        return { ...old, pages: newPages };
      });
      return { previous };
    },
    onError: (err, newItem, context:any) => {
      qc.setQueryData(['items'], context.previous);
    },
    onSettled: () => { qc.invalidateQueries(['items']); }
  });
};
