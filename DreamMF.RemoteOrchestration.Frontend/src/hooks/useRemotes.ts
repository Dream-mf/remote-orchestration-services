import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { config } from '@/config/env';

interface Remote {
    id: number;
    name: string;
    url?: string;
    storageType: string;
    configuration: string;
    created_Date: string;
    updated_Date: string;
}

export interface RemoteModule {
    id?: number;
    name: string;
    created_Date?: string;
    updated_Date?: string;
}

interface RemoteRequest {
    name: string;
    storageType: string;
    configuration: string;
}

interface RemoteModuleCount {
    remoteId: number;
    count: number;
}

interface RemoteSubRemoteCount {
    remoteId: number;
    count: number;
}

// Fetch module counts for all remotes
const fetchRemoteModuleCounts = async (): Promise<RemoteModuleCount[]> => {
    const response = await fetch(`${config.backendUrl}/api/remotes/module-counts`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Fetch sub-remote counts for all remotes
const fetchRemoteSubRemoteCounts = async (): Promise<RemoteSubRemoteCount[]> => {
    const response = await fetch(`${config.backendUrl}/api/remotes/sub-remote-counts`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useRemotes = () => {
    return useQuery<Remote[]>({
        queryKey: ['remotes'],
        queryFn: async () => {
            const response = await fetch(`${config.backendUrl}/api/remotes`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });
};

export const useRemote = (id: number) => {
    return useQuery<Remote>({
        queryKey: ['remotes', id],
        queryFn: async () => {
            const response = await fetch(`${config.backendUrl}/api/remotes/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!id,
        throwOnError: true
    });
};

export const useCreateRemote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (remote: RemoteRequest) => {
            const response = await fetch(`${config.backendUrl}/api/remotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remote),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remotes'] });
        },
    });
};

export const useUpdateRemote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, remote }: { id: number; remote: RemoteRequest }) => {
            console.log(remote);
            const response = await fetch(`${config.backendUrl}/api/remotes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remote),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remotes'] });
        },
    });
};

export const useDeleteRemote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${config.backendUrl}/api/remotes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remotes'] });
        },
    });
};

export const useRemoteModuleCounts = () => {
    return useQuery({
        queryKey: ['remotes', 'module-counts'],
        queryFn: fetchRemoteModuleCounts,
    });
};

export const useRemoteSubRemoteCounts = () => {
    return useQuery({
        queryKey: ['remotes', 'sub-remote-counts'],
        queryFn: fetchRemoteSubRemoteCounts,
    });
};
