import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orpc } from '../lib/api';
export const useContent = () => useQuery(orpc.school.content.queryOptions({ staleTime: 60000 }));
export const useSubmit = () => useMutation(orpc.school.submit.mutationOptions());
export const useSetPassword = () => useMutation(orpc.school.setPassword.mutationOptions());
export const useAdmin = (enabled: boolean) => useQuery(orpc.school.admin.queryOptions({ enabled, retry: false }));
export const useRequests = (enabled: boolean) => useQuery(orpc.school.requests.queryOptions({ enabled, retry: false }));
export function useSave() { const qc = useQueryClient(); return useMutation(orpc.school.save.mutationOptions({ onSuccess: () => qc.invalidateQueries({ queryKey: orpc.school.content.key() }) })); }
export function useStatus() { const qc = useQueryClient(); return useMutation(orpc.school.status.mutationOptions({ onSuccess: () => qc.invalidateQueries({ queryKey: orpc.school.requests.key() }) })); }