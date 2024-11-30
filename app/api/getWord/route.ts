import { NextResponse } from "next/server";

export async function GET(req:any){
    try{
        const answers = [
            "Jim", "Fungi", "Frost", "Pine", "Quest", "Lantern", "Grumble", 
            "Blizzard", "Aurora", "Hearth", "Snowfall", "Starfall", "Crystal", "Tundra", 
            "Chime", "Frostfire", "Twilight", "Glacier", "Cinder", "Boulder", "Fungi", 
            "Haven", "Obelisk", "Resolution", "Phoenix", "Thorn", "Grumble", "Crescent", 
            "Eclipse", "Fissure", "Solstice"
        ];
        
        const hints = [
            "I'm the heart of the world you explore, A name you'll hear forevermore.",
            "I grow where it's damp and dark, Spreading life with every spark.",
            "I cover the ground in icy white. Beware my chill, both day and night.",
            "Evergreen and standing tall, In winter's grip, I do not fall.",
            "A journey begins with this first step. Seek and find; what is it?",
            "I light the way in darkest night. Small and warm, I banish fright.",
            "I rumble low and complain aloud, My voice is rough, my tone unbowed.",
            "I rage across the land so cold, A storm of ice, both fierce and bold.",
            "A light that dances across the sky, Colors bright as stars pass by.",
            "I warm the weary, I light the night, Gather near, and feel my might.",
            "I drift gently from the sky, A blanket white where I lie.",
            "I streak across the endless night, A fleeting wish, a fleeting light.",
            "Clear and sharp, I catch the light, A gem of ice, a frozen sight.",
            "A frozen plain, vast and wide, Little can survive in my icy stride.",
            "I ring out to mark the hour, A gentle song, not one of power.",
            "I burn cold, a paradox true, A mix of red and icy blue.",
            "Neither night nor day am I, A fleeting moment in the sky.",
            "I carve the mountains, slow and grand, A frozen river shapes the land.",
            "Ash and ember, small and bright, My spark can grow into fiery might.",
            "I'm heavy, still, and hard to move, My strength is something you must prove.",
            "I bloom in shadows, soft and small, I grow without sunlight at all.",
            "A place of safety, a place of peace, Where troubles fade and worries cease.",
            "I stand tall, a monument true, A marker of time, old and new.",
            "At year's end, I bring resolve, A promise made to problems solve.",
            "I rise from ashes, born anew, My flame burns bright, a golden hue.",
            "I guard the rose with a sharp sting, Beware my touch, for pain I bring.",
            "A voice of thunder, a sound so low, My name is what I often show.",
            "I curve in the sky, soft and bright, A sliver of silver in the night.",
            "I shadow the sun in a cosmic play, Turning bright noon into twilight gray.",
            "A crack in the ground, deep and wide, Beware the drop, the cavern's side.",
            "The longest night or brightest day, My mark divides the year's display."
        ];
          const date = new Date();
          const today = date.getDate();

          return NextResponse.json({word:answers[today], hint:hints[today]},{status:200})
    }
    catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}