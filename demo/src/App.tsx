import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/code-block";

function App() {
  const [location, setLocation] = useState("London");
  const [weather, setWeather] = useState("Rainy");
  const [style, setStyle] = useState("Oil Painting");
  const [date] = useState(new Date().toLocaleDateString());

  // Mode state
  const [activeTab, setActiveTab] = useState("direct");

  const prompt = `A beautiful scene in {location}, where the weather is {weather}, there are flying pigs in the background somewhere, and there is the text 'Slop Machine was here {date}', all in the style of {style}`;

  const directCodeString = `<SlopImage
  prompt="${prompt}"
  variables={{
    location: "${location}",
    weather: "${weather}",
    style: "${style}",
    date: new Date().toLocaleDateString()
  }}
/>`;

  // Example Bucket ID (Mock)
  const bucketCodeString = `<SlopImage
  bucket="weather_scene" 
  // version is optional (defaults to current)
  variables={{
    location: "${location}",
    weather: "${weather}"
  }}
/>`;

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-heading mb-2">Slop Machine</h1>
            <h2 className="font-subheading">"Just-in-Time" Assets Demo</h2>
          </div>

          <Tabs defaultValue="direct" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="direct">Direct Prompt Mode</TabsTrigger>
              <TabsTrigger value="bucket">Bucket (Managed) Mode</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Controls */}
              <Card className="bg-accent">
                <CardHeader>
                  <CardTitle>Context Variables</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  {activeTab === "direct" && (
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
                  )}
                  
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <p className="bg-background p-2 rounded-sm text-sm text-muted-foreground">{date}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Output */}
              <div className="aspect-square relative">
                <TabsContent value="direct" className="mt-0 h-full">
                  <SlopImage
                    prompt={prompt}
                    variables={{
                      location,
                      weather,
                      style,
                      date,
                    }}
                    className="w-full h-full object-cover rounded-sm shadow-md"
                  />
                </TabsContent>
                <TabsContent value="bucket" className="mt-0 h-full">
                  <div className="relative w-full h-full group">
                    {/* 
                        DEMO TRICK: We are using the 'prompt' mode here to ensure the demo 
                        works immediately without needing to seed the database with specific 
                        silo/bucket IDs. 
                        
                        In a real app, you would use:
                        <SlopImage bucket="weather_scene" ... />
                     */}
                    <SlopImage
                      prompt={prompt}
                      variables={{
                        location,
                        weather,
                        style, // We include style here to match the visual output of the direct mode
                        date,
                      }}
                      className="w-full h-full object-cover rounded-sm shadow-md"
                    />
                     {/* Overlay to explain what's happening */}
                     <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Simulating: bucket="weather_scene"
                     </div>
                  </div>
                </TabsContent>
              </div>

              {/* Code Block */}
              <div className="col-span-1 md:col-span-2 overflow-hidden rounded-sm border-2 shadow-retro-lg border-neutral-800 bg-neutral-950">
                <TabsContent value="direct" className="mt-0">
                  <CodeBlock code={directCodeString} language="tsx" showLineNumbers wrap>
                    <CodeBlockCopyButton />
                  </CodeBlock>
                </TabsContent>
                <TabsContent value="bucket" className="mt-0">
                  <CodeBlock code={bucketCodeString} language="tsx" showLineNumbers wrap>
                    <CodeBlockCopyButton />
                  </CodeBlock>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
