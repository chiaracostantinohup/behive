import { createContext, useState, useCallback } from 'react';

export const ShareContext = createContext(null);

export function ShareProvider({ children }) {
  // { [resourceId]: { readLink: string|null, group: string|null } }
  const [sharingState, setSharingState] = useState({});
  // { [token]: { resourceId, resourceType } }
  const [tokenRegistry, setTokenRegistry] = useState({});
  // { [groupId]: { sourceId, resourceType, members: string[] } }
  const [groupRegistry, setGroupRegistry] = useState({});
  // Modal state
  const [modal, setModal] = useState({
    open: false,
    resourceId: null,
    resourceType: null,
    initialTab: 'link',
  });

  const getSharing = useCallback(
    (resourceId) => sharingState[resourceId] ?? { readLink: null, group: null },
    [sharingState]
  );

  const setSharing = useCallback((resourceId, updater) => {
    setSharingState((prev) => ({
      ...prev,
      [resourceId]: updater(prev[resourceId] ?? { readLink: null, group: null }),
    }));
  }, []);

  const registerToken = useCallback((token, resourceId, resourceType) => {
    setTokenRegistry((prev) => ({ ...prev, [token]: { resourceId, resourceType } }));
  }, []);

  const unregisterToken = useCallback((token) => {
    setTokenRegistry((prev) => {
      const next = { ...prev };
      delete next[token];
      return next;
    });
  }, []);

  const resolveToken = useCallback(
    (token) => tokenRegistry[token] ?? null,
    [tokenRegistry]
  );

  const addGroupResource = useCallback((groupId, sourceId, resourceType, memberIds) => {
    setGroupRegistry((prev) => ({
      ...prev,
      [groupId]: { sourceId, resourceType, members: memberIds },
    }));
  }, []);

  const updateGroupMembers = useCallback((groupId, updater) => {
    setGroupRegistry((prev) => {
      if (!prev[groupId]) return prev;
      return { ...prev, [groupId]: { ...prev[groupId], members: updater(prev[groupId].members) } };
    });
  }, []);

  const getGroupInfo = useCallback(
    (groupId) => groupRegistry[groupId] ?? null,
    [groupRegistry]
  );

  const openShare = useCallback((resourceId, resourceType, initialTab = 'link') => {
    setModal({ open: true, resourceId, resourceType, initialTab });
  }, []);

  const closeShare = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  return (
    <ShareContext.Provider
      value={{
        modal, openShare, closeShare,
        getSharing, setSharing,
        registerToken, unregisterToken, resolveToken,
        addGroupResource, updateGroupMembers, getGroupInfo,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}

export default ShareProvider;
