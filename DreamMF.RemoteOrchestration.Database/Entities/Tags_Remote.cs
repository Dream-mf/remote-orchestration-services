using System.ComponentModel.DataAnnotations;

namespace DreamMF.RemoteOrchestration.Database.Entities;

public class Tags_Remote
{
    [Key]
    public int Tag_Remote_ID { get; set; }
    public int Remote_ID { get; set; }
    public int Tag_ID { get; set; }
    public Tag Tag { get; set; } = null!;
    public DateTimeOffset Created_Date { get; set; }
    public DateTimeOffset Updated_Date { get; set; }
}
