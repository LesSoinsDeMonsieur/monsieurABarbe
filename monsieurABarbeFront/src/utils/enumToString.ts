import { AuthStatus } from "@/contexts/AuthContext";

export const authStatusToString = (status: AuthStatus): string => {
  switch (status) {
    case AuthStatus.LOGIN_UNAVAILABLE:
      return "L'Email ou le Pseudo existe déjà";
    case AuthStatus.ERROR:
      return "Erreur interne";
    case AuthStatus.INVALID_FORMAT:
      return "Format invalide";
    case AuthStatus.WRONG_CREDENTIALS:
      return "mot de passe invalide";
    default:
      return "Erreur Inconnue";
  }
};
