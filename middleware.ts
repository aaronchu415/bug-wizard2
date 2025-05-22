import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Add public routes here if needed, for example:
  // publicRoutes: ["/"] 
});

export const config = {
  matcher: ['/((?!.*\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
