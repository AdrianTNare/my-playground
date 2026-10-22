import type { Access } from "payload";

/** Signed-in editors see drafts; everyone else only published docs. */
export const publishedOrSignedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } };

export const signedIn: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;
