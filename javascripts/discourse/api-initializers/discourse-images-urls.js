import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.decorateCookedElement(function (post, helper) {
    if (helper) {
      const postElement = $(post);
      const imageTags = postElement.find("img");
      let imageUrls = [];

      imageTags.each(function () {
        const imgElement = $(this);
        const lightboxLink = imgElement.closest("a.lightbox");

        if (lightboxLink.length) {
          imageUrls.push(lightboxLink.attr("href"));
        } else {
          imageUrls.push(imgElement.attr("src"));
        }
      });

      if (imageUrls.length) {
        const codeBlockContents = imageUrls.join("\n");
        const imgWrappedContents = imageUrls
          .map((url) => `[img]${url}[/img]`)
          .join("\n");

        const tableHTML = `
      <div class="md-table img-urls">
        <table>
          <thead>
            <tr>
              <th>Plain</th>
              <th>BBCode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><pre><code>${codeBlockContents}</code></pre></td>
              <td><pre><code>${imgWrappedContents}</code></pre></td>
            </tr>
          </tbody>
        </table>
      </div>
      `;

        postElement.append(tableHTML);
      }
    }
  });
});
