import { useContext } from 'react';
import { ShareContext } from '../context/ShareContext';

export function useShare(resourceId, resourceType) {
  const ctx = useContext(ShareContext);
  if (!ctx) throw new Error('useShare must be used within ShareProvider');

  const sharing = ctx.getSharing(resourceId);

  const generateLink = () => {
    const token = Math.random().toString(36).slice(2, 10);
    ctx.setSharing(resourceId, (s) => ({ ...s, readLink: token }));
    ctx.registerToken(token, resourceId, resourceType);
  };

  const revokeLink = () => {
    ctx.setSharing(resourceId, (s) => ({ ...s, readLink: null }));
  };

  const createGroup = (memberIds) => {
    const groupId = 'group-' + Math.random().toString(36).slice(2, 8);
    ctx.setSharing(resourceId, (s) => ({ ...s, group: groupId }));
    ctx.addGroupResource(groupId, resourceId, resourceType, memberIds);
  };

  const addMember = (memberId) => {
    if (!sharing.group) return;
    ctx.updateGroupMembers(sharing.group, (members) => [...members, memberId]);
  };

  const removeMember = (memberId) => {
    if (!sharing.group) return;
    ctx.updateGroupMembers(sharing.group, (members) => members.filter((m) => m !== memberId));
  };

  return { sharing, generateLink, revokeLink, createGroup, addMember, removeMember };
}

export default useShare;
