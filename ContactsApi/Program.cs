var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var statesDict = new Dictionary<string, string>
{
    {"AL", "Alabama" },
    {"AK", "Alaska" },
    {"AZ", "Arizona" },
    {"AR", "Arkansas" },
    {"CA", "California" },
    {"CO", "Colorado" },
    {"CT", "Connecticut" },
    {"DE", "Delaware" },
    {"DC", "District of Columbia" },
    {"FL", "Florida" },
    {"GA", "Georgia" },
    {"HI", "Hawaii" },
    {"ID", "Idaho" },
    {"IL", "Illinois" },
    {"IN", "Indiana" },
    {"IA", "Iowa" },
    {"KS", "Kansas" },
    {"KY", "Kentucky" },
    {"LA", "Louisiana" },
    {"ME", "Maine" },
    {"MD", "Maryland" },
    {"MA", "Massachusetts" },
    {"MI", "Michigan" },
    {"MN", "Minnesota" },
    {"MS", "Mississippi" },
    {"MO", "Missouri" },
    {"MT", "Montana" },
    {"NE", "Nebraska" },
    {"NV", "Nevada" },
    {"NH", "New Hampshire" },
    {"NJ", "New Jersey" },
    {"NM", "New Mexico" },
    {"NY", "New York" },
    {"NC", "North Carolina" },
    {"ND", "North Dakota" },
    {"OH", "Ohio" },
    {"OK", "Oklahoma" },
    {"OR", "Oregon" },
    {"PA", "Pennsylvania" },
    {"RI", "Rhode Island" },
    {"SC", "South Carolina" },
    {"SD", "South Dakota" },
    {"TN", "Tennessee" },
    {"TX", "Texas" },
    {"UT", "Utah" },
    {"VT", "Vermont" },
    {"VA", "Virginia" },
    {"WA", "Washington" },
    {"WV", "West Virginia" },
    {"WI", "Wisconsin" },
    {"WY", "Wyoming" }
};

var contactFreqArr = new []
{
    "Contact only about account information",
    "OK to contact with marketing information",
    "OK to contact with third-party marketing information"
};

app.MapGet("/states", () =>
{
    String[] statesKeys = new String[statesDict.Keys.Count];
    statesDict.Keys.CopyTo(statesKeys, 0);

    var states =  Enumerable.Range(0, statesDict.Keys.Count).Select(index =>
        new State
        (
            index,
            statesKeys[index],
            statesDict[statesKeys[index]]
        ))
        .ToArray();
    return states;
})
.WithName("GetStates");



app.MapGet("/contact-freq", () => {
    var contactFrequencies = Enumerable.Range(0, 3).Select(index =>
        new ContactFreq
        (
            index,
            contactFreqArr[index]
        )).ToArray();
    return contactFrequencies;
}).WithName("GetContactFreq");



app.Run();

record State(int id, string abbrev, string name)
{}

record ContactFreq(int id, string name)
{}