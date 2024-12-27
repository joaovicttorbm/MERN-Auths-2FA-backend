// Configura autenticação baseada em JWT usando passport-jwt

import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithRequest,
} from "passport-jwt";
import { UnauthorizedException } from "../utils/catch-errors";
import { ErrorCode } from "../enums/error-code.enum";
import { config } from "../../config/app.config";
import passport, { PassportStatic } from "passport";
import { userService } from "../../modules/user/user.module";


interface JwtPayload {
  userId: string;
  sessionId: string;
}

/**
 * Extrai o token JWT dos cookies da requisição.
 * @param req Objeto da requisição
 * @returns Token JWT ou lança exceção
 */
const extractJwtFromCookies = (req: any): string | null => {
  const accessToken = req.cookies?.accessToken || null;
  if (!accessToken) {
    throw new UnauthorizedException(
      "Unauthorized access token",
      ErrorCode.AUTH_TOKEN_NOT_FOUND
    );
  }
  return accessToken;
};

/**
 * Configurações da estratégia JWT
 */
const jwtStrategyOptions: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookies]),
  secretOrKey: config.JWT.SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
  passReqToCallback: true,
};

/**
 * Configura a estratégia de autenticação JWT no Passport.
 * @param passport Instância do Passport
 */
export const setupJwtStrategy = (passport: PassportStatic): void => {
  passport.use(
    new JwtStrategy(jwtStrategyOptions, async (req, payload: JwtPayload, done) => {
      try {
        const user = await userService.findUserById(payload.userId);
        if (!user) {
          return done(null, false);
        }
        req.sessionId = payload.sessionId;
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

/**
 * Middleware de autenticação baseado em JWT.
 */
export const authenticateJWT = passport.authenticate("jwt", { session: false });
