import { useState, useEffect } from "react";
import { SlopImage } from "../../src/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ThemeProvider } from "./components/theme-provider";
import { ExampleComponent } from "./components/example-component";

function App() {
  const [location, setLocation] = useState("London");
  const [weather, setWeather] = useState("Rainy");
  const [style, setStyle] = useState("Oil Painting");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  // Mock auto-update date/weather?
  useEffect(() => {
    // Just for demo vibes
  }, []);

  const prompt = `A beautiful scene in {location}, where the weather is {weather}, there are flying pigs in the background somewhere, and there is the text 'Slop Machine was here {date}', all in the style of {style}`;

  const codeString = `<SlopImage
  prompt="${prompt}"
  variables={{
    location: "${location}",
    weather: "${weather}",
    style: "${style}",
    date: new Date().toLocaleDateString()
  }}
/>`;

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen p-8 font-sans max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl font-heading">Slop Machine</h1>
        <h2 className="font-subheading">Basic Example</h2>
        <p className="text-foreground/50">
          Image with variables provided at runtime.
        </p>
        <ExampleComponent
          code={codeString}
          output={
            <SlopImage
              prompt={prompt}
              variables={{
                location,
                weather,
                style,
                date,
              }}
              className="w-full h-full object-cover transition-opacity duration-500 aspect-square"
            />
          }
          controls={
            <>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="London">London</SelectItem>
                    <SelectItem value="Tokyo">Tokyo</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Mars">Mars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Weather</Label>
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rainy">Rainy</SelectItem>
                    <SelectItem value="Sunny">Sunny</SelectItem>
                    <SelectItem value="Snowing">Snowing</SelectItem>
                    <SelectItem value="Apocalyptic">Apocalyptic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oil Painting">Oil Painting</SelectItem>
                    <SelectItem value="Cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="Minimalist Vector">
                      Minimalist Vector
                    </SelectItem>
                    <SelectItem value="Claymation">Claymation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <p className="bg-background p-2 rounded-sm">{date}</p>
              </div>
            </>
          }
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
