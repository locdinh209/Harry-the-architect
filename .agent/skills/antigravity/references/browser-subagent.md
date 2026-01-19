# Browser Subagent

Use browser subagents for complex browser automation and testing.

## When to Use

- Multi-step browser interactions
- Visual verification
- Form filling workflows
- Screenshot/video capture

## Basic Usage

```python
browser_subagent(
    TaskName="Login Flow Test",
    Task="""
    1. Navigate to http://localhost:3000/login
    2. Fill email field with "test@example.com"
    3. Fill password field with "password123"
    4. Click the login button
    5. Wait for dashboard to load
    6. Take a screenshot as proof
    7. Return: success/failure and any error messages
    """,
    RecordingName="login_test"
)
```

## Task Definition Best Practices

1. **Be specific:** Include URLs, selectors, values
2. **Clear steps:** Numbered list of actions
3. **Define success:** What to check/verify
4. **Return data:** What information to report back
5. **Recording name:** Lowercase with underscores

## After Subagent Returns

```python
# Take snapshot to see results
mcp_chrome-devtools_take_snapshot()

# Or capture screenshot
mcp_chrome-devtools_take_screenshot(
    filePath="/path/to/artifacts/result.png"
)
```

## Common Patterns

### Form Testing
```python
browser_subagent(
    TaskName="Contact Form Test",
    Task="Fill contact form with test data and submit. Verify success message appears.",
    RecordingName="contact_form"
)
```

### Navigation Verification
```python
browser_subagent(
    TaskName="Check Navigation",
    Task="Click each nav link and verify correct page loads.",
    RecordingName="nav_check"
)
```

## Error Handling

If subagent reports `open_browser_url` failed:
- Ask user how to proceed
- Check if dev server is running
- Verify URL is correct
