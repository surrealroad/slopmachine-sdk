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
  const [location, setLocation] = useState("Auto");
  const [weather, setWeather] = useState("Auto");
  const [style, setStyle] = useState("Oil Painting");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const [detectedLocation, setDetectedLocation] = useState("");
  const [detectedWeather, setDetectedWeather] = useState("");
  const [locationAutoDisabled, setLocationAutoDisabled] = useState(false);
  const [weatherAutoDisabled, setWeatherAutoDisabled] = useState(false);

  useEffect(() => {
    if (location === "Auto") {
      setDetectedLocation("Detecting...");
      fetch("https://ipapi.co/country_name/")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch location");
          return res.text();
        })
        .then((data) => setDetectedLocation(data.trim()))
        .catch(() => {
          setDetectedLocation("Unknown Location");
          setLocation("London");
          setLocationAutoDisabled(true);
        });
    }
  }, [location]);

  const effectiveLocation = location === "Auto" ? detectedLocation : location;

  useEffect(() => {
    if (weather === "Auto") {
      if (effectiveLocation === "Detecting..." || !effectiveLocation) {
        setDetectedWeather("Waiting for location...");
        return;
      }
      setDetectedWeather("Detecting...");
      fetch(
        `https://wttr.in/${encodeURIComponent(effectiveLocation)}?format=%C`,
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch weather");
          return res.text();
        })
        .then((data) => setDetectedWeather(data.trim()))
        .catch(() => {
          setDetectedWeather("Unknown Weather");
          setWeather("Rainy");
          setWeatherAutoDisabled(true);
        });
    }
  }, [weather, effectiveLocation]);

  const effectiveWeather = weather === "Auto" ? detectedWeather : weather;

  const codeLocation =
    location === "Auto"
      ? `getLocation() // ${detectedLocation}`
      : `"${effectiveLocation}"`;
  const codeWeather =
    weather === "Auto"
      ? `getWeather(getLocation()) // ${detectedWeather}`
      : `"${effectiveWeather}"`;

  const basicExamplePrompt = `A beautiful scene in {location}, where the weather is {weather}, there are flying pigs in the background somewhere, and there is the text 'Slop Machine was here {date}', all in the style of {style}`;

  const managedExamplePrompt = `A chaotic, hellish scene of flames engulfing a a labyrinth of glass-walled skyscrapers and digital billboards, with explosions and smoke filling the air, with a sense of intense heat and disarray. The image should be smooth shaded colors, that establishes mood and lighting, but only hints at specific details.`;

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen p-8 font-sans max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-heading">Slop Machine SDK Demo</h1>
        <div className="space-y-2">
          <h2 className="font-subheading">Basic Example</h2>
          <p className="text-foreground/50">
            Image with variables provided at runtime.
          </p>
          <ExampleComponent
            code={`<SlopImage
  prompt="${basicExamplePrompt}"
  variables={{
    location: ${codeLocation},
    weather: ${codeWeather},
    style: "${style}",
    date: new Date().toLocaleDateString()
  }}
/>`}
            output={
              <SlopImage
                prompt={basicExamplePrompt}
                variables={{
                  location: effectiveLocation,
                  weather: effectiveWeather,
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
                      <SelectItem value="Auto" disabled={locationAutoDisabled}>
                        Auto
                      </SelectItem>
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
                      <SelectItem value="Auto" disabled={weatherAutoDisabled}>
                        Auto
                      </SelectItem>
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
        <div className="space-y-2">
          <h2 className="font-subheading">Managed Example</h2>
          <p className="text-foreground/50">
            Specific image from a Slop Machine bucket.{" "}
            <a
              href="http://slopmachine.dev/share/WHc9Wvh2O8"
              className="text-primary text-underline font-bold"
              target="_blank">
              View on Slop Machine
            </a>
          </p>
          <ExampleComponent
            code={`<SlopImage bucket="WhQq52dMlu6LIEotNUG" seed="2010200834" />`}
            output={
              // fake it for now
              <img
                src="https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2FxzAVSzI7ThEzsbht1VMv%2F1769796774059_0.png?alt=media&token=ebca88f6-0582-45e9-a47a-d1bb3114409c"
                alt="A chaotic, hellish scene of flames engulfing a a labyrinth of glass-walled skyscrapers and digital billboards, with explosions and smoke filling the air, with a sense of intense heat and disarray. The image should be smooth shaded colors, that establishes mood and lighting, but only hints at specific details."
                className="w-full h-full object-cover transition-opacity duration-500 aspect-square"
              />
            }
            controls={
              <div className="space-y-2">
                <Label>Bucket</Label>
                <p className="bg-background p-2 rounded-sm">
                  WhQq52dMlu6LIEotNUG
                </p>
                <Label>Seed</Label>
                <p className="bg-background p-2 rounded-sm">2010200834</p>
              </div>
            }
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
