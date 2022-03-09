---
layout: post
title:  "How to build a .NET 6 project with Visual Studio 2019"
date:   2022-03-09 23:35:00 +0200
categories: posts
tags: [visual studio, .net]
---

Unfortunately, the official statement from Microsoft says:

> .NET 6 is supported with Visual Studio 2022 and Visual Studio 2022 for Mac. It is not supported with Visual Studio 2019, Visual Studio for Mac 8, or MSBuild 16. If you want to use .NET 6, you will need to upgrade to Visual Studio 2022 (which is also now 64-bit).

<div style="text-align: right">
    <a href="https://devblogs.microsoft.com/dotnet/announcing-net-6/" 
    target="_blank">Source</a>
</div>

# The workaround

Modify your project `.csproj` file as follows:

```xml
<TargetFramework>net6.0</TargetFramework>

<!-- The workaround for VS2019 -->
<PropertyGroup Condition="$(VisualStudioVersion) != 17.0">
    <LangVersion>preview</LangVersion>
</PropertyGroup>
```

After this, you should be able to build the project using Visual Studio 2019. Team members that are already using Visual Studio 2022 (if any) will not be impacted by this change.