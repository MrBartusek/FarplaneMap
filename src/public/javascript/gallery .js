export default function updateGallery()
{
	const galleries = document.getElementsByClassName('sidebar-cover-gallery');
	for(const gallery of galleries)
	{
		const images = gallery.getElementsByClassName('sidebar-gallery-image');
		images[0].style.display = 'block';
		const next = gallery.getElementsByClassName('gallery-slide-next')[0];
		const prev = gallery.getElementsByClassName('gallery-slide-prev')[0];
		let lastImage = 0;
		next.addEventListener('click', () =>
		{
			if(lastImage == images.length - 1)
			{
				changeImage(images[lastImage], images[0]);
				lastImage = 0;
			}
			else
			{
				changeImage(images[lastImage], images[lastImage + 1]);
				lastImage = lastImage + 1;
			}
		});
		prev.addEventListener('click', () =>
		{
			if(lastImage == 0)
			{
				changeImage(images[lastImage], images[images.length - 1]);
				lastImage = images.length - 1;
			}
			else
			{
				changeImage(images[lastImage], images[lastImage - 1]);
				lastImage = lastImage -1;
			}
		});
	}
}

function changeImage(oldImage, newImage)
{
	oldImage.style.display = 'none';
	newImage.style.display = 'block';
}

