import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { UserPermission, UserRole } from './auth-super-tokens.constants';

export const getAdminRoleValidator = () =>
  getSTValidator({
    roles: [UserRole.Admin],
  });

export const getSTValidator = ({
  roles = [],
  permissions = [],
}: {
  roles?: UserRole[];
  permissions?: UserPermission[];
}) => ({
  overrideGlobalClaimValidators: async (
    globalValidators: SessionClaimValidator[],
  ) => [
    ...globalValidators,
    ...roles?.map((role) => UserRoles.UserRoleClaim.validators.includes(role)),
    ...permissions?.map((permission) =>
      UserRoles.PermissionClaim.validators.includes(permission),
    ),
  ],
});
