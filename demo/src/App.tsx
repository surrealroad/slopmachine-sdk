import { useState, useEffect } from "react";
import { SlopImage } from "../../src/index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

  const [result, setResult] = useState("Auto");
  const [version, setVersion] = useState("Auto");

  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("black");
  const [slopColor, setSlopColor] = useState("pink");

  const [detectedLocation, setDetectedLocation] = useState("");
  const [detectedWeather, setDetectedWeather] = useState("");
  const [locationAutoDisabled, setLocationAutoDisabled] = useState(false);
  const [weatherAutoDisabled, setWeatherAutoDisabled] = useState(false);

  // hardcode the urls for now until we have a robust auth solution
  const v1r1src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2FzwIwYUODVAYar7PeXz0U%2F1769871708268_0.png?alt=media&token=71d9fb84-6c38-494a-b7dc-5caba21a9902";
  const v1r2src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2FdBGIpSyZu9BHgc028u3a%2F1769871727238_0.png?alt=media&token=ab3b7fcd-742c-42b2-a61f-10c61c45bd7a";
  const v2r1src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2FxJiZNqDOR35Bop86saJM%2F1769872430321_0.png?alt=media&token=b4e3d9dd-91f5-4c61-b084-465d2d17f2e7";
  const v2r2src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2F6uCftinejqT9DfbbyMHN%2F1769872405195_0.png?alt=media&token=26dfc00c-a776-49c2-9470-65c527132e48";
  const v2r3src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2FDqacTLhrHg2amUmmgkZP%2F1769872400183_0.png?alt=media&token=3376302b-eb3c-4d43-9b6d-a13f3ab599cc";
  const v2r4src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2FSRYuYGG31BmVZTSgkwPj%2F1769872393295_0.png?alt=media&token=7ceba14c-4f21-472f-9a9b-eb215e73abf7";
  const v2r5src =
    "https://firebasestorage.googleapis.com/v0/b/slopmachine-12bfb.firebasestorage.app/o/generations%2F6HGiYX3fSQWOloZfUq3v%2F1769872394150_0.png?alt=media&token=7190d6f2-8cdf-488b-ab96-d99054ce790d";

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
      ? `getLocation(), // ${detectedLocation}`
      : `"${effectiveLocation},"`;
  const codeWeather =
    weather === "Auto"
      ? `getWeather(getLocation()), // ${detectedWeather}`
      : `"${effectiveWeather},"`;

  const basicExamplePrompt = `A beautiful scene in {location}, where the weather is {weather}, there are flying pigs in the background somewhere, and there is the text 'Slop Machine was here {date}', all in the style of {style}`;

  const managedExamplePromptV1 = `A hyper-realistic, slightly dystopian product photo of a can of 'Premium Slop' sitting on a stark concrete pedestal. The can label is minimalist neobrutalist design, bold black Helvetica text on raw aluminum that reads 'CONTENT SUBSTITUTE'. The background is a soft, clinical laboratory white with harsh, dramatic shadows. A single, perfect, viscous drip of iridescent, glowing pink goo is running down the side of the can. 8k resolution, ray-traced reflections, high fashion editorial lighting, sterile aesthetic.`;
  const managedExamplePromptV2 = `A 4:5 vertical, center-framed macro shot, hyper-realistic, slightly dystopian product photo of a weathered metal industrial pail sitting on a brutalist concrete plinth. The label on the pail is minimalist neobrutalist design, precisely rendered, bold black Helvetica text on rusted metal that reads 'CONTENT SUBSTITUTE'. The background is a soft, seamless matte white laboratory cove with subtle recessed panel lines with harsh, dramatic shadows. A single, perfect, viscous drip of iridescent, glowing opaque pink gloop is running down the side of the can. 8k resolution, ray-traced reflections, cinematic color grading with desaturated tones and a cold cyan tint in the shadows, high fashion editorial lighting with a shallow depth of field (f/2.8) to softly blur the clinical background, sterile aesthetic .`;

  const managedWithControlsExamplePrompt = `A 4:5 vertical, center-framed macro shot, hyper-realistic, slightly dystopian product photo of a weathered metal industrial pail sitting on a brutalist concrete plinth. The label on the pail is minimalist neobrutalist design, precisely rendered, bold {textcolor} Helvetica text on rusted metal that reads 'CONTENT SUBSTITUTE'. The background is a soft, seamless matte {bgcolor} laboratory cove with subtle recessed panel lines with harsh, dramatic shadows. A single, perfect, viscous drip of iridescent, glowing opaque {slopcolor} gloop is running down the side of the can. 8k resolution, ray-traced reflections, cinematic color grading with desaturated tones and a cold cyan tint in the shadows, high fashion editorial lighting with a shallow depth of field (f/2.8) to softly blur the clinical background, sterile aesthetic .`;

  const isLocationLoading =
    location === "Auto" &&
    (detectedLocation === "Detecting..." || !detectedLocation);
  const isWeatherLoading =
    weather === "Auto" &&
    (detectedWeather === "Detecting..." ||
      detectedWeather === "Waiting for location..." ||
      !detectedWeather);
  const isLoading = isLocationLoading || isWeatherLoading;

  const effectiveVersion = version === "Auto" ? "v2" : version;

  const versionOptions = [
    { value: "Auto", label: "Auto (Latest)" },
    { value: "v2", label: "2" },
    { value: "v1", label: "1" },
  ];

  const resultOptionsV1 = [
    { value: "Auto", label: "Auto (Most Recently Approved)" },
    { value: "r2", label: "M54AC7Cq3ceE1GKwiSiI" },
    { value: "r1", label: "SSxQEJ19WDBUhT14h98H" },
  ];

  const resultOptionsV2 = [
    { value: "Auto", label: "Auto (Most Recently Approved)" },
    { value: "r5", label: "9gpgLjG4rgKfbgo3D8rF" },
    { value: "r4", label: "A19Ro6EPsnXxfqlNmmWo" },
    { value: "r3", label: "GUEOINjZL2Ij3nju0Zah" },
    { value: "r2", label: "JwQ5KffuLwn9J78PjI4W" },
    { value: "r1", label: "M0xuW8bq9xs3jH7HE7QE" },
  ];

  const currentResultOptions =
    effectiveVersion === "v1" ? resultOptionsV1 : resultOptionsV2;

  const getManagedSrc = () => {
    if (effectiveVersion === "v1") {
      if (result === "r1") return v1r1src;
      return v1r2src; // Auto, r2, or fallback
    }
    // v2
    if (result === "r1") return v2r1src;
    if (result === "r2") return v2r2src;
    if (result === "r3") return v2r3src;
    if (result === "r4") return v2r4src;
    if (result === "r5") return v2r5src;
    return v2r5src; // Auto or fallback
  };

  const managedSrc = getManagedSrc();

  const versionLabel =
    versionOptions.find((o) => o.value === version)?.label || version;
  const resultLabel =
    currentResultOptions.find((o) => o.value === result)?.label || result;

  const hasVersion = version !== "Auto";
  const hasResult = result !== "Auto";
  const hasProps = hasVersion || hasResult;

  let managedCode;
  if (hasProps) {
    managedCode = `<SlopImage\n  bucket="WhQq52dMlu6LIEotNUG"`;
    if (hasVersion) managedCode += `\n  version="${versionLabel}"`;
    if (hasResult) managedCode += `\n  result="${resultLabel}"`;
    managedCode += `\n/>`;
  } else {
    managedCode = `<SlopImage bucket="WhQq52dMlu6LIEotNUG" />`;
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen p-8 font-sans max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-heading">Slop Machine SDK Demo</h1>

        <div className="space-y-2">
          <h2 className="font-subheading">Basic Example</h2>
          <p className="text-foreground/50">
            Image with prompt provided at runtime.
          </p>
          <ExampleComponent
            code={`<SlopImage
  prompt="${basicExamplePrompt}"
  variables={{
    location: ${codeLocation}
    weather: ${codeWeather}
    style: "${style}",
    date: new Date().toLocaleDateString()
  }}
/>`}
            output={
              isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-muted aspect-square">
                  <p className="text-muted-foreground animate-pulse">
                    Generating parameters...
                  </p>
                </div>
              ) : (
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
              )
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
            Image based on a{" "}
            <a
              href="http://slopmachine.dev"
              className="text-primary text-underline font-bold"
              target="_blank">
              Slop Machine
            </a>{" "}
            bucket.
          </p>
          <ExampleComponent
            code={managedCode}
            output={
              // fake it for now
              <img
                src={managedSrc}
                alt={
                  version === "v1"
                    ? managedExamplePromptV1
                    : managedExamplePromptV2
                }
                className="w-full h-full object-cover transition-opacity duration-500 aspect-square"
              />
            }
            controls={
              <>
                <div className="space-y-2">
                  <Label>Bucket</Label>
                  <p className="bg-background p-2 rounded-sm">
                    fFzg3gpfI03VdjTekcQd
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Select value={version} onValueChange={setVersion}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={versionOptions[0].value}>
                        {versionOptions[0].label}
                      </SelectItem>
                      <SelectGroup>
                        <SelectLabel>Specific Version</SelectLabel>
                        {versionOptions.slice(1).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Result</Label>
                  <Select value={result} onValueChange={setResult}>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={currentResultOptions[0].value}>
                        {currentResultOptions[0].label}
                      </SelectItem>
                      <SelectGroup>
                        <SelectLabel>Specific Result</SelectLabel>
                        {currentResultOptions.slice(1).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </>
            }
          />
        </div>

        <div className="space-y-2">
          <h2 className="font-subheading">Managed with Controls Example</h2>
          <p className="text-foreground/50">
            Image based on a{" "}
            <a
              href="http://slopmachine.dev"
              className="text-primary text-underline font-bold"
              target="_blank">
              Slop Machine
            </a>{" "}
            bucket, with variables provided at runtime.
          </p>
          <ExampleComponent
            code={`<SlopImage
  bucket="WhQq52dMlu6LIEotNUG"
  variables={{
    textcolor: "${textColor}",
    bgcolor: "${bgColor}",
    slopcolor: "${slopColor}",
  }}
/>`}
            output={
              <SlopImage
                prompt={managedWithControlsExamplePrompt}
                variables={{
                  textcolor: textColor,
                  bgcolor: bgColor,
                  slopcolor: slopColor,
                }}
                className="w-full h-full object-cover transition-opacity duration-500 aspect-square"
              />
            }
            controls={
              <>
                <div className="space-y-2">
                  <Label>Bucket</Label>
                  <p className="bg-background p-2 rounded-sm">
                    fFzg3gpfI03VdjTekcQd
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <Select value={textColor} onValueChange={setTextColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select text color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Select value={bgColor} onValueChange={setBgColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select background color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Slop Color</Label>
                  <Select value={slopColor} onValueChange={setSlopColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select slop color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            }
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
