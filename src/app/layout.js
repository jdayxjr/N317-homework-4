import "./globals.css";
import Nav from "@/app/components/Nav/page";
import { PokemonProvider } from "@/app/hooks/usePokemonApi";
import { FavoriteProvider } from "@/contexts/FavoriteContext"; // Adjust the path if needed

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <PokemonProvider>
          <Nav />
          <FavoriteProvider>
            {children}
          </FavoriteProvider>
        </PokemonProvider>

      </body>
    </html >
  );
} 